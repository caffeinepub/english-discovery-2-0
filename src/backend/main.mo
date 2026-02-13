import Array "mo:core/Array";
import Text "mo:core/Text";
import List "mo:core/List";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  let inquiries = List.empty<Inquiry>();

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

  public shared ({ caller }) func submitInquiry(name : Text, email : Text, message : Text, timestamp : Int) : async () {
    let inquiry = {
      name;
      email;
      message;
      timestamp;
    };
    inquiries.add(inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.toArray().sort(Inquiry.compareByTimestamp);
  };

  public shared ({ caller }) func deleteInquiry(timestamp : Int) : async () {
    let filteredList = inquiries.filter(func(inquiry) { inquiry.timestamp != timestamp });
    if (filteredList.size() == inquiries.size()) {
      Runtime.trap("Inquiry not found");
    };
    inquiries.clear();
    inquiries.addAll(filteredList.values());
  };
};
