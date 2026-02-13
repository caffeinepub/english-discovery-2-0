import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useGetAllInquiries } from '../hooks/useQueries';
import {
  useListPhotos,
  useAddPhoto,
  useUpdatePhoto,
  useDeletePhoto,
} from '../hooks/usePhotos';
import {
  useHasAdminPassword,
  useSetAdminPassword,
  useVerifyAdminPassword,
  useResetAdminPassword,
} from '../hooks/useAdminPassword';
import { useGetWebsiteContent, useUpdateWebsiteContent } from '../hooks/useWebsiteContent';
import { useAdminSession } from '../hooks/useAdminSession';
import { MessageSquare, Mail, User, Calendar, Lock, AlertCircle, Image, Upload, Trash2, Save, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const PHOTO_SLOTS = [
  { id: 'hero', label: 'Hero', description: 'Main hero section image' },
  { id: 'founder_kuldeep', label: 'Founder Kuldeep', description: 'Kuldeep profile photo' },
  { id: 'founder_saloni', label: 'Co-founder Saloni Singh', description: 'Saloni Singh profile photo' },
  { id: 'founder_sumit', label: 'Co-founder Sumit Srivastava', description: 'Sumit Srivastava profile photo' },
];

export default function AdminPage() {
  const queryClient = useQueryClient();
  const { isAuthenticated, login, logout } = useAdminSession();

  const { data: hasPassword, isLoading: isLoadingPassword } = useHasAdminPassword();
  const setPasswordMutation = useSetAdminPassword();
  const verifyPasswordMutation = useVerifyAdminPassword();
  const resetPasswordMutation = useResetAdminPassword();

  const {
    data: inquiries,
    isLoading: isLoadingInquiries,
    error: inquiriesError,
  } = useGetAllInquiries(isAuthenticated);

  const { data: photos, isLoading: isLoadingPhotos } = useListPhotos(isAuthenticated);
  const addPhoto = useAddPhoto();
  const updatePhoto = useUpdatePhoto();
  const deletePhoto = useDeletePhoto();

  const { data: websiteContent, isLoading: isLoadingContent } = useGetWebsiteContent();
  const updateContent = useUpdateWebsiteContent();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // Content editor state
  const [editedContent, setEditedContent] = useState({
    heroText: '',
    aboutContent: '',
    classesContent: '',
    pricingContent: '',
    schedule: '',
    contactInfo: '',
    introVideoLink: '',
  });

  // Initialize content editor when data loads
  useState(() => {
    if (websiteContent && !editedContent.heroText) {
      setEditedContent(websiteContent);
    }
  });

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
      await setPasswordMutation.mutateAsync(password);
      setPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setPasswordError(error.message || 'Failed to set password');
    }
  };

  const handleVerifyPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    try {
      const isValid = await verifyPasswordMutation.mutateAsync(password);
      if (isValid) {
        login();
        setPassword('');
      } else {
        setPasswordError('Incorrect password. Please try again.');
      }
    } catch (error: any) {
      setPasswordError(error.message || 'Failed to verify password');
    }
  };

  const handleLogout = () => {
    logout();
    queryClient.clear();
    setPassword('');
  };

  const handleResetPassword = async () => {
    try {
      await resetPasswordMutation.mutateAsync();
      logout();
      queryClient.clear();
      setResetDialogOpen(false);
    } catch (error: any) {
      alert(error.message || 'Failed to reset password');
    }
  };

  const handleFileUpload = async (slotId: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const existingPhoto = photos?.find((p) => p.id === slotId);

    try {
      if (existingPhoto) {
        await updatePhoto.mutateAsync({
          id: slotId,
          name: file.name,
          file,
          onProgress: (percentage) => {
            setUploadProgress((prev) => ({ ...prev, [slotId]: percentage }));
          },
        });
      } else {
        await addPhoto.mutateAsync({
          id: slotId,
          name: file.name,
          file,
          onProgress: (percentage) => {
            setUploadProgress((prev) => ({ ...prev, [slotId]: percentage }));
          },
        });
      }
      setUploadProgress((prev) => ({ ...prev, [slotId]: 0 }));
    } catch (err: any) {
      alert(err.message || 'Failed to upload photo');
      setUploadProgress((prev) => ({ ...prev, [slotId]: 0 }));
    }
  };

  const handleDeletePhoto = async () => {
    if (!photoToDelete) return;

    try {
      await deletePhoto.mutateAsync(photoToDelete);
      setDeleteDialogOpen(false);
      setPhotoToDelete(null);
    } catch (err: any) {
      alert(err.message || 'Failed to delete photo');
    }
  };

  const openDeleteDialog = (slotId: string) => {
    setPhotoToDelete(slotId);
    setDeleteDialogOpen(true);
  };

  const handleSaveContent = async () => {
    try {
      await updateContent.mutateAsync(editedContent);
      alert('Website content updated successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to update content');
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Loading state
  if (isLoadingPassword) {
    return (
      <div className="section-padding">
        <div className="container-custom max-w-md">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Password setup screen
  if (hasPassword === false) {
    return (
      <div className="section-padding">
        <div className="container-custom max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Set Admin Password</CardTitle>
              <CardDescription>
                Create a password to secure your admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password (min 6 characters)"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    required
                  />
                </div>
                {passwordError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{passwordError}</AlertDescription>
                  </Alert>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={setPasswordMutation.isPending}
                >
                  {setPasswordMutation.isPending ? 'Setting Password...' : 'Set Password'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Password login screen
  if (!isAuthenticated) {
    return (
      <div className="section-padding">
        <div className="container-custom max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>
                Enter your admin password to access the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerifyPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loginPassword">Password</Label>
                  <Input
                    id="loginPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                  />
                </div>
                {passwordError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{passwordError}</AlertDescription>
                  </Alert>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={verifyPasswordMutation.isPending}
                >
                  {verifyPasswordMutation.isPending ? 'Verifying...' : 'Log In'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  if (inquiriesError) {
    return (
      <div className="section-padding">
        <div className="container-custom max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your website content</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <Lock className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load inquiries. Please try again.
            </AlertDescription>
          </Alert>

          <div className="mt-4">
            <Button variant="outline" onClick={handleLogout}>
              Log Out and Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-custom max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your website content</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setResetDialogOpen(true)}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Password
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <Lock className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        </div>

        <Tabs defaultValue="inquiries" className="space-y-6">
          <TabsList>
            <TabsTrigger value="inquiries">
              <MessageSquare className="mr-2 h-4 w-4" />
              Student Inquiries
            </TabsTrigger>
            <TabsTrigger value="photos">
              <Image className="mr-2 h-4 w-4" />
              Photos
            </TabsTrigger>
            <TabsTrigger value="content">
              <Save className="mr-2 h-4 w-4" />
              Website Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Inquiries</CardTitle>
                <CardDescription>
                  {inquiries && inquiries.length > 0
                    ? `${inquiries.length} total ${inquiries.length === 1 ? 'inquiry' : 'inquiries'}`
                    : 'No inquiries yet'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingInquiries ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    ))}
                  </div>
                ) : !inquiries || inquiries.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No student inquiries yet</h3>
                    <p className="text-muted-foreground">
                      When students submit the contact form, their messages will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {inquiries.map((inquiry) => (
                          <TableRow key={inquiry.timestamp.toString()}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{inquiry.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{inquiry.email}</span>
                              </div>
                            </TableCell>
                            <TableCell className="max-w-md">
                              <p className="text-sm line-clamp-2">{inquiry.message}</p>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  {formatDate(inquiry.timestamp)}
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {inquiries && inquiries.length > 0 && (
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Inquiries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{inquiries.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Latest Inquiry
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm font-medium">{inquiries[0]?.name || 'N/A'}</div>
                    <div className="text-xs text-muted-foreground">
                      {inquiries[0] ? formatDate(inquiries[0].timestamp) : ''}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="default">Active</Badge>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="photos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Photo Management</CardTitle>
                <CardDescription>
                  Upload and manage photos for your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingPhotos ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {PHOTO_SLOTS.map((slot) => {
                      const photo = photos?.find((p) => p.id === slot.id);
                      const progress = uploadProgress[slot.id];

                      return (
                        <div key={slot.id} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{slot.label}</h3>
                              <p className="text-sm text-muted-foreground">
                                {slot.description}
                              </p>
                            </div>
                            {photo && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openDeleteDialog(slot.id)}
                                disabled={deletePhoto.isPending}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            )}
                          </div>

                          {photo ? (
                            <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                              <img
                                src={photo.blob.getDirectURL()}
                                alt={slot.label}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed bg-muted/50">
                              <div className="text-center">
                                <Image className="mx-auto h-12 w-12 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">
                                  No photo uploaded
                                </p>
                              </div>
                            </div>
                          )}

                          {progress > 0 && progress < 100 && (
                            <div className="space-y-2">
                              <Progress value={progress} />
                              <p className="text-xs text-center text-muted-foreground">
                                Uploading... {progress}%
                              </p>
                            </div>
                          )}

                          <div className="flex gap-2">
                            <Label
                              htmlFor={`upload-${slot.id}`}
                              className="flex-1 cursor-pointer"
                            >
                              <div className="flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                                <Upload className="h-4 w-4" />
                                {photo ? 'Replace' : 'Upload'}
                              </div>
                            </Label>
                            <Input
                              id={`upload-${slot.id}`}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(slot.id, file);
                                }
                              }}
                              disabled={
                                addPhoto.isPending ||
                                updatePhoto.isPending ||
                                progress > 0
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Content Editor</CardTitle>
                <CardDescription>
                  Update text content and links displayed on your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isLoadingContent ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-20 w-full" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="heroText">Hero Section Text</Label>
                      <Textarea
                        id="heroText"
                        value={editedContent.heroText}
                        onChange={(e) =>
                          setEditedContent({ ...editedContent, heroText: e.target.value })
                        }
                        placeholder="Main hero section text"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="aboutContent">About Section</Label>
                      <Textarea
                        id="aboutContent"
                        value={editedContent.aboutContent}
                        onChange={(e) =>
                          setEditedContent({ ...editedContent, aboutContent: e.target.value })
                        }
                        placeholder="About section content"
                        rows={5}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="classesContent">Classes Section</Label>
                      <Textarea
                        id="classesContent"
                        value={editedContent.classesContent}
                        onChange={(e) =>
                          setEditedContent({
                            ...editedContent,
                            classesContent: e.target.value,
                          })
                        }
                        placeholder="Classes section content"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pricingContent">Pricing Section</Label>
                      <Textarea
                        id="pricingContent"
                        value={editedContent.pricingContent}
                        onChange={(e) =>
                          setEditedContent({
                            ...editedContent,
                            pricingContent: e.target.value,
                          })
                        }
                        placeholder="Pricing section content"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="schedule">Schedule Information</Label>
                      <Textarea
                        id="schedule"
                        value={editedContent.schedule}
                        onChange={(e) =>
                          setEditedContent({ ...editedContent, schedule: e.target.value })
                        }
                        placeholder="Schedule and timing information"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactInfo">Contact Information</Label>
                      <Textarea
                        id="contactInfo"
                        value={editedContent.contactInfo}
                        onChange={(e) =>
                          setEditedContent({ ...editedContent, contactInfo: e.target.value })
                        }
                        placeholder="Contact information"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="introVideoLink">YouTube Channel Link</Label>
                      <Input
                        id="introVideoLink"
                        type="url"
                        value={editedContent.introVideoLink}
                        onChange={(e) =>
                          setEditedContent({
                            ...editedContent,
                            introVideoLink: e.target.value,
                          })
                        }
                        placeholder="https://youtube.com/@yourchannel"
                      />
                      <p className="text-xs text-muted-foreground">
                        This link will be used for the YouTube icon in the header and footer
                      </p>
                    </div>

                    <Button
                      onClick={handleSaveContent}
                      disabled={updateContent.isPending}
                      className="w-full"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {updateContent.isPending ? 'Saving...' : 'Save All Changes'}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Delete Photo Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Photo</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this photo? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeletePhoto}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Reset Password Confirmation Dialog */}
        <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset Admin Password</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to reset your admin password? You will be logged out
                and will need to set a new password.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleResetPassword}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Reset Password
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
