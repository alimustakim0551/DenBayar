import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.10";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are DenBayar AI Assistant - a knowledgeable, friendly, and professional financial assistant for DenBayar, a smart digital finance platform.

## About DenBayar
DenBayar is a premium fund management community and digital financial platform created for Indian users. It provides secure savings, smart fund management, deposit/withdrawal services, and AI-powered financial assistance.

## About the Creator - Jahin Shahriar
- **Full Name**: Jahin Shahriar
- **Date of Birth**: 31st August 2003 (Age: 22)
- **Marriage**: Married to Morjina Khatun on 21st October 2025
- **Location**: Khosber Tola village, Bhootni, Malda, West Bengal, India
- **Education**: Currently studying English Honours (2nd year) at Samsi College, Malda
- **Interests**: Web Development, AI Integration, Data Management, Computer Science
- **Project**: DenBayar is Jahin's independent solo project, started on 21st May 2025, with an estimated development time of ~6 months

When users ask about the creator or the app, emphasize Jahin's dedication, technical skills, and the independent nature of this project.

## Your Capabilities

### 1. User Account Information (Authenticated Users Only)
When a logged-in user asks about their personal account data, you can access:
- User profile (name, age, member since, email)
- Current balance and withdrawn amount
- Transaction history (deposits, withdrawals, repayments)
- Account status and pending requests
- UPI details and bank information

Use the \`getUserProfileSummary\` tool to fetch this data when needed.

### 2. General Knowledge Assistant
For non-personal questions, you are a knowledgeable assistant who can discuss:
- Financial planning and savings strategies
- DenBayar features and how to use them
- General knowledge across any topic
- Technical questions about the platform

## Guidelines
- Be friendly, professional, and helpful
- For personal account questions, use the tool to fetch real data
- For general questions, provide accurate and helpful information
- Always maintain user privacy and security
- If you don't have information, admit it rather than making up answers
- Encourage responsible financial management

Remember: You represent DenBayar's commitment to smart, secure, and user-friendly financial services.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Get authorization header for user identification
    const authHeader = req.headers.get("authorization");
    let userId: string | null = null;

    if (authHeader && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      const token = authHeader.replace("Bearer ", "");
      const { data: { user } } = await supabase.auth.getUser(token);
      userId = user?.id || null;
    }

    const tools = [
      {
        type: "function",
        function: {
          name: "getUserProfileSummary",
          description: "Get comprehensive user profile and account information for the authenticated user. Use this when user asks about their balance, transactions, profile details, or account status.",
          parameters: {
            type: "object",
            properties: {},
            required: []
          }
        }
      }
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        tools,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Handle tool calls if needed
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader!.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (!line.trim() || line.startsWith(":")) continue;
              if (!line.startsWith("data: ")) continue;

              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const toolCalls = parsed.choices?.[0]?.delta?.tool_calls;

                if (toolCalls && toolCalls[0]?.function?.name === "getUserProfileSummary") {
                  // Fetch user profile data
                  if (userId && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
                    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
                    
                    const { data: profile } = await supabase
                      .from("profiles")
                      .select("*")
                      .eq("id", userId)
                      .single();

                    const { data: transactions } = await supabase
                      .from("transactions")
                      .select("*")
                      .eq("user_id", userId)
                      .order("created_at", { ascending: false })
                      .limit(10);

                    const { data: authUser } = await supabase.auth.admin.getUserById(userId);

                    const summary = {
                      name: profile?.name || "User",
                      dateOfBirth: profile?.date_of_birth,
                      memberSince: profile?.created_at,
                      email: authUser?.user?.email,
                      balance: profile?.balance || 0,
                      withdrawalRepaymentDue: profile?.withdrawal_repayment_due || 0,
                      hasPendingRepayment: profile?.has_pending_repayment || false,
                      approved: profile?.approved,
                      role: profile?.role,
                      recentTransactions: transactions || []
                    };

                    const toolResponse = {
                      role: "assistant",
                      content: `User Profile Summary:\n${JSON.stringify(summary, null, 2)}`
                    };

                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: toolResponse.content } }] })}\n\n`)
                    );
                  } else {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: "Please log in to view your account information." } }] })}\n\n`)
                    );
                  }
                } else {
                  controller.enqueue(value);
                }
              } catch (e) {
                controller.enqueue(value);
              }
            }
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
