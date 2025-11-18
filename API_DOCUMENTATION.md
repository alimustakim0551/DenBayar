# DenBayar AI API Documentation

## Overview
DenBayar AI chatbot uses **OpenRouter API** to provide intelligent conversational capabilities.

## API Provider
- **Service**: OpenRouter (https://openrouter.ai)
- **Model**: `google/gemini-2.0-flash-exp:free`
- **API Endpoint**: `https://openrouter.ai/api/v1/chat/completions`

## Configuration
The API key is dynamically managed through the admin panel and stored securely in the Supabase database.

### Admin Configuration
1. Navigate to Admin Dashboard
2. Click "AI Service Config" button
3. Enter your OpenRouter API key
4. Click "Apply Changes"

## API Features
- **Streaming responses**: Real-time message streaming for better UX
- **Tool calling**: Supports function calling for database queries
- **Unlimited messaging**: No built-in rate limits (depends on your OpenRouter account)
- **Free tier available**: Using the free Gemini 2.0 Flash model

## API Limitations

### 1. Account-Based Limits
- Rate limits depend on your OpenRouter account tier
- Free tier: Limited requests per minute
- Paid tiers: Higher rate limits based on subscription

### 2. Model Limitations
- **Model**: Gemini 2.0 Flash Experimental (Free)
- **Context window**: 1M tokens
- **Max output**: 8,192 tokens
- **Capabilities**: Text generation, function calling, Bengali language support

### 3. Cost Structure
- Free tier: No cost, but limited usage
- Paid tier: Pay-per-use based on tokens
- Pricing details: https://openrouter.ai/docs#models

### 4. Rate Limiting
When rate limits are exceeded:
- HTTP 429 error returned
- User receives "Rate limits exceeded" message
- Solution: Wait or upgrade OpenRouter account

### 5. Availability
- Service uptime: Depends on OpenRouter infrastructure
- Fallback: No automatic fallback (requires manual API key update)

## How to Get an API Key

1. Visit [OpenRouter](https://openrouter.ai)
2. Sign up for an account
3. Navigate to API Keys section
4. Generate a new API key
5. Copy the key (format: `sk-or-v1-...`)
6. Enter it in DenBayar admin panel

## Security
- API keys are stored encrypted in Supabase
- Only admins can view/update API keys
- Keys are never exposed to frontend clients
- All AI requests are proxied through secure edge functions

## Troubleshooting

### AI Not Responding
1. Check if API key is configured
2. Verify API key is valid on OpenRouter dashboard
3. Check edge function logs for errors

### Rate Limit Errors
1. Wait for rate limit to reset
2. Upgrade OpenRouter account
3. Update API key if needed

### Invalid API Key
1. Verify key format (`sk-or-v1-...`)
2. Check if key is active on OpenRouter
3. Generate new key and update in admin panel

## Support
For API-related issues:
- OpenRouter Support: https://openrouter.ai/docs
- DenBayar Support: Contact admin

## Best Practices
1. Monitor API usage on OpenRouter dashboard
2. Update API key before it expires
3. Use appropriate rate limiting on application level
4. Keep API keys confidential
5. Regularly rotate API keys for security
