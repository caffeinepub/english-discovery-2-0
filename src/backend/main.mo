import Array "mo:core/Array";
import List "mo:core/List";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type WebsiteContent = {
    heroText : Text;
    aboutContent : Text;
    classesContent : Text;
    pricingContent : Text;
    schedule : Text;
    contactInfo : Text;
    introVideoLink : Text;
  };

  type FaqItem = {
    id : Nat;
    question : Text;
    answer : Text;
  };

  type Inquiry = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  module Inquiry {
    public func compareByTimestamp(a : Inquiry, b : Inquiry) : Order.Order {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  type Photo = {
    id : Text;
    blob : Storage.ExternalBlob;
    name : Text;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  let inquiries = List.empty<Inquiry>();
  let photos = Map.empty<Text, Photo>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let faqs = List.empty<FaqItem>();
  var adminPassword : ?Text = null;

  var websiteContent = {
    heroText = "Welcome to YogaCure ";
    aboutContent = "YogaCure was founded by Pradeep Jadhav, a former software engineer...";
    classesContent = "Explore our classes suitable for all ages and experience levels.";
    pricingContent = "Affordable pricing options available for both online and in-person classes.";
    schedule = "Check our schedule for upcoming classes and events.";
    contactInfo = "For inquiries, contact Pradeep at +91 98201 31307 or email yogacure.pradeep@gmail.com";
    introVideoLink = "https://www.youtube.com/embed/_qEv3yHwK8k?si=g_Hy3kaWMU_Rti5p";
  };

  public shared ({ caller }) func setAdminPassword(password : Text) : async () {
    if (adminPassword != null) {
      Runtime.trap("Admin password already set");
    };
    adminPassword := ?password;
  };

  public query ({ caller }) func verifyAdminPassword(password : Text) : async Bool {
    switch (adminPassword, password) {
      case (?stored, input) { stored == input };
      case (null, _) { false };
    };
  };

  public query ({ caller }) func hasAdminPassword() : async Bool {
    adminPassword != null;
  };

  public shared ({ caller }) func resetAdminPassword() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reset password");
    };
    adminPassword := null;
  };

  public shared ({ caller }) func updateWebsiteContent(content : WebsiteContent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update website content");
    };
    websiteContent := content;
  };

  public query ({ caller }) func getWebsiteContent() : async WebsiteContent {
    websiteContent;
  };

  // User Profile Management (required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Inquiry Management
  public shared ({ caller }) func submitInquiry(name : Text, email : Text, message : Text, timestamp : Int) : async () {
    // Public function - anyone including guests can submit inquiries
    let inquiry = {
      name;
      email;
      message;
      timestamp;
    };
    inquiries.add(inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all inquiries");
    };
    inquiries.toArray().sort(Inquiry.compareByTimestamp);
  };

  public shared ({ caller }) func deleteInquiry(timestamp : Int) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete inquiries");
    };
    let filteredList = inquiries.filter(func(inquiry) { inquiry.timestamp != timestamp });
    if (filteredList.size() == inquiries.size()) {
      Runtime.trap("Inquiry not found");
    };
    inquiries.clear();
    inquiries.addAll(filteredList.values());
  };

  public shared ({ caller }) func clearAllInquiries() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can clear all inquiries");
    };
    inquiries.clear();
  };

  public query ({ caller }) func countInquiries() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can count inquiries");
    };
    inquiries.size();
  };

  // Photo Management (Admin Only)
  public query ({ caller }) func listPhotos() : async [Photo] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can list photos");
    };
    photos.toArray().map(func((_, photo)) { photo });
  };

  public shared ({ caller }) func addPhoto(id : Text, name : Text, blob : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add photos");
    };
    let photo = { id; name; blob };
    if (photos.containsKey(id)) {
      Runtime.trap("The ID " # id # " already exists. Please use a unique ID.");
    };
    photos.add(id, photo);
  };

  public shared ({ caller }) func updatePhoto(id : Text, name : Text, blob : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update photos");
    };
    switch (photos.get(id)) {
      case (null) { Runtime.trap("The ID " # id # " does not exist. Please provide a valid ID."); };
      case (?_) {
        let photo = { id; name; blob };
        photos.add(id, photo);
      };
    };
  };

  public shared ({ caller }) func deletePhoto(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete photos");
    };
    switch (photos.get(id)) {
      case (null) { Runtime.trap("The ID " # id # " does not exist. Please provide a valid ID."); };
      case (?_) {
        photos.remove(id);
      };
    };
  };

  public query ({ caller }) func getPhoto(id : Text) : async ?Photo {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view photos");
    };
    photos.get(id);
  };
};
