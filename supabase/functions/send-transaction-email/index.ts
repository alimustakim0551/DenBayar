import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  user_id: string;
  transaction_id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  action: string;
  amount: number;
  status: string;
  reason?: string;
  admin_notes?: string;
  phonepe_upi: string;
  balance: number;
  join_date: string;
  user_role: string;
  is_overdraw?: boolean;
  overdraw_amount?: number;
  repayment_duration?: string;
  created_at: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const emailData: EmailRequest = await req.json();

    const statusColor = emailData.status === "approved" ? "#10b981" : emailData.status === "rejected" ? "#ef4444" : "#f59e0b";
    const statusText = emailData.status === "approved" ? "Approved ✓" : emailData.status === "rejected" ? "Rejected ✗" : "Pending ⏳";

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Inter', Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          .header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 30px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
          .header p { margin: 5px 0 0 0; font-size: 14px; opacity: 0.9; }
          .content { padding: 30px 20px; }
          .status-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 14px; background-color: ${statusColor}; color: white; margin-bottom: 20px; }
          .info-section { background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
          .info-row:last-child { border-bottom: none; }
          .info-label { font-weight: 600; color: #6b7280; }
          .info-value { color: #111827; font-weight: 500; }
          .amount { font-size: 32px; font-weight: 700; color: #3b82f6; text-align: center; margin: 20px 0; }
          .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; }
          .button { display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏦 DenBayar</h1>
            <p>Premium Financial Services & Fund Management</p>
          </div>
          <div class="content">
            <div class="status-badge">${statusText}</div>
            <h2>Hello ${emailData.user_name}!</h2>
            <p>Your ${emailData.action} request has been <strong>${emailData.status}</strong>.</p>
            
            <div class="amount">₹${emailData.amount.toLocaleString('en-IN')}</div>
            
            <div class="info-section">
              <div class="info-row">
                <span class="info-label">Transaction Type:</span>
                <span class="info-value">${emailData.action}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Status:</span>
                <span class="info-value">${emailData.status.toUpperCase()}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Date:</span>
                <span class="info-value">${new Date(emailData.created_at).toLocaleString('en-IN')}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Current Balance:</span>
                <span class="info-value">₹${emailData.balance.toLocaleString('en-IN')}</span>
              </div>
              ${emailData.is_overdraw ? `
              <div class="info-row">
                <span class="info-label">Overdraw Amount:</span>
                <span class="info-value">₹${emailData.overdraw_amount?.toLocaleString('en-IN')}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Repayment Duration:</span>
                <span class="info-value">${emailData.repayment_duration}</span>
              </div>
              ` : ''}
              ${emailData.reason ? `
              <div class="info-row">
                <span class="info-label">Reason:</span>
                <span class="info-value">${emailData.reason}</span>
              </div>
              ` : ''}
              ${emailData.admin_notes ? `
              <div class="info-row">
                <span class="info-label">Admin Notes:</span>
                <span class="info-value">${emailData.admin_notes}</span>
              </div>
              ` : ''}
            </div>

            ${emailData.status === "approved" && emailData.action === "Deposit" ? `
            <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; color: #065f46;"><strong>✓ Your deposit has been approved!</strong></p>
              <p style="margin: 5px 0 0 0; color: #047857;">Your balance has been updated. You can now use these funds.</p>
            </div>
            ` : ''}

            ${emailData.status === "approved" && emailData.action === "Withdrawal" ? `
            <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; color: #065f46;"><strong>✓ Your withdrawal has been approved!</strong></p>
              <p style="margin: 5px 0 0 0; color: #047857;">Funds will be transferred to your PhonePe UPI: <strong>${emailData.phonepe_upi}</strong></p>
            </div>
            ` : ''}

            <center>
              <a href="https://denbayar.com/dashboard" class="button">View Dashboard</a>
            </center>
          </div>
          <div class="footer">
            <p><strong>DenBayar</strong> - Your Trusted Fund Management Community</p>
            <p>Member since ${new Date(emailData.join_date).toLocaleDateString('en-IN')}</p>
            <p style="margin-top: 15px; font-size: 11px;">
              This is an automated email. Please do not reply.<br>
              Contact: support@denbayar.com | Phone: ${emailData.user_phone}
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "DenBayar <onboarding@resend.dev>",
      to: [emailData.user_email],
      subject: `DenBayar: ${emailData.action} ${statusText} - ₹${emailData.amount.toLocaleString('en-IN')}`,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-transaction-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
