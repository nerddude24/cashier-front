# Daily Sales Report API Documentation

# use http://127.0.0.1:8000

## Endpoint: `/login`

This endpoint is for login 

### Request

#### HTTP Method
`POST`

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string  | yes | the cashier's name |
| password | string | yes | the cashier's password |
| cash_register_id | integer | yes | the cash register id that the cashier is using , should be storing in localstorage |

#### Headers

| Header | Value | Required | Description |
|--------|-------|----------|-------------|
| Accept | application/json | Yes | Specifies the response format |

### Response

#### Success Response (200 OK)

```json
{
    "message": "User logged in!",
    "token": "2|grqtMWlDzkxKrW0FQ2sQAjOifUjstx8GriPIwWZ6efdfbf9b"
}
```

#### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| message | string | simple message |
| token | string | used for other routes |


#### Error Responses

**Validation Errors**

**400 Bad Request**
```json
{
    "errors": {
        "name": [
            "The name field is required."
        ],
        "password": [
            "The password field is required."
        ],
        "cash_register_id": [
            "The cash register id field is required."
        ]
    }
}
```

**Wrong EMail or Password**

**401 Unauthorized**
```json
{
  "error": "Credentials do not match our records",
}
```

**Cash Register not found**


**404 Not Found**
```json
{
  "error" : "Cash register not found"
}
```

**Already Used Cash Register**

**401 Unauthorized**
```json
{
  "error": "This cash register is already in use",
}
```

## Endpoint: `/logout`

This endpoint is for logout

### Request

#### HTTP Method
`POST`

#### Headers

| Header | Value | Required | Description |
|--------|-------|----------|-------------|
| Accept | application/json | Yes | Specifies the response format |
|Authorization|Bearer {token}|Yes|Authentication token|

### Response

#### Success Response (200 OK)

```json
{
    "message": "User logged in!",
}
```

## Error Responses

**No token Provided**

**401 Unauthorized**

```json
{
    "message" :'Token not provided'
}
```

**Invalid or Expired Token**
**401 Unauthorized**

```json
{
    "message" : 'Invalid or expired token'
}
```

## Endpoint: `/search`

This endpoint is for searching for products

### Request

#### HTTP Method
`POST`

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| search | string or integer | yes | used for seaching for products string used for product name and integer for barcode |

#### Headers

| Header | Value | Required | Description |
|--------|-------|----------|-------------|
| Accept | application/json | Yes | Specifies the response format |
|Authorization|Bearer {token}|Yes|Authentication token|

### Response

#### Success Response (200 OK)

```json

{
    "product": {
        "id": 1,
        "name": "fromage rouge",
        "price": 49
    }
}

```

## Error Responses


**Validation Errors**

**400 Bad Request**
```json
{
    "errors": {
        "search": [
            "The name field is required."
        ]
 }
}
```

**Product not found**
**404 not found**

```json
{
    "errors":{
        "search":[
            "the name field is required"
        ]
    }
}
```

## Endpoint: `/ticket`

This endpoint is for making a purchase

### Request

#### HTTP Method
`POST`

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| payment_method | string  | yes | payment_method |

#### Headers

| Header | Value | Required | Description |
|--------|-------|----------|-------------|
| Accept | application/json | Yes | Specifies the response format |
|Authorization|Bearer {token}|Yes|Authentication token|

### Response

#### Success Response (200 OK)

```json
{
    "ticket": {
        "sale_id": 33,
        "supermarket_name": "kalama",
        "date": "2025-04-21 10:38:43",
        "payment_method": "cash",
        "cash_register_id": 1,
        "cashier": "hichem boutouatou",
        "products": [
            {
                "id": 1,
                "name": "fromage rouge",
                "price": 49,
                "quantity": 2,
                "subtotal": 98
            },
            {
                "id": 2,
                "name": "ma9arona 500g",
                "price": 20,
                "quantity": 2,
                "subtotal": 40
            },
            {
                "id": 3,
                "name": "spagette",
                "price": 17,
                "quantity": 2,
                "subtotal": 34
            }
        ],
        "total": 172
    }
}
```

## Error Responses

**validation Errors**

```json
{

    "error": {
        "payment_method": [
            "The payment method field is required."
        ],
        "products": [
            "The products field is required."
        ]
    }
}

```

**User not assigned to a cashRegister**
**403 Forbidden**

```json
{
"error" : 'You are not assigned to a cash register. Please login.'
}
```
**Product not found**
**404 not found**
```json
{
    "error": "Product not found"
}
```

**Stock empty**
**404 not found**

```json
{
    "error":"not enough quantity for product {$product->name}]"
}

```
