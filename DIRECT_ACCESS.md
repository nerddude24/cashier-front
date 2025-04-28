# Direct Cashier Access (Development Mode)

This document explains how to bypass the login flow and directly access the cashier interface for development purposes.

## How to Access the Cashier Interface Without Login

We've implemented a special development route that allows you to bypass the authentication flow and directly access the cashier interface.

### Option 1: Use the Direct Access URL

Simply navigate to:

```
/direct-cashier
```

This route will automatically set the necessary authentication tokens and redirect you to the cashier interface without requiring login credentials.

### Option 2: Direct Navigation

In development mode, you can also directly navigate to:

```
/cashier
```

The middleware has been configured to bypass authentication checks for the cashier route when in development mode.

## How It Works

1. We've modified the middleware to detect development mode and bypass authentication for the cashier route
2. A mock cashier user is provided when accessing protected routes
3. The direct-cashier route sets a client-side cookie and redirects to the cashier interface

## Note

This bypass is only active in development mode and won't work in production environments for security reasons.
