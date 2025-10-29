import React from "react";

export default function FAQ() {
  return (
    <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Frequently Asked Questions</h1>
      <h2>How do I track my order?</h2>
      <p>Log in and go to your Orders page to see status updates.</p>
      <h2>What payment methods do you accept?</h2>
      <p>We accept Razorpay, credit cards, and more (coming soon).</p>
      <h2>Can I return a product?</h2>
      <p>Yes, within 7 days. Contact support for details.</p>
      <h2>How do I reset my password?</h2>
      <p>Use the "Forgot Password" link on the login page (feature coming soon).</p>
    </div>
  );
}