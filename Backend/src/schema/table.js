module.exports = {
    customerTable: `
        CREATE TABLE IF NOT EXISTS customer (
            customer_id SERIAL PRIMARY KEY,
            customer_name VARCHAR(600) NOT NULL,  -- Adjusted length
            customer_email VARCHAR(600) NOT NULL UNIQUE,  -- Adjusted length
            customer_password VARCHAR(600) NOT NULL,  -- Use TEXT for passwords and hash them
            customer_phonenumber BIGINT,  -- Adjusted to VARCHAR for international numbers
            customer_address JSON,
            createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            lastLoginAt TIMESTAMP WITH TIME ZONE,
            access_token TEXT,
            wallet_amount INTEGER DEFAULT 0,
            group_id INTEGER  -- Add foreign key constraint if needed
        )
    `,
    createCategoryTable: `
          CREATE TABLE IF NOT EXISTS category (
            category_id SERIAL PRIMARY KEY,
            category_name VARCHAR(255) NOT NULL,
            category_description text,
            category_price integer NOT NULL,
            category_media TEXT
          );`,
        addressTable:`
          CREATE TABLE IF NOT EXISTS addresses (
      address_id SERIAL PRIMARY KEY,
      tag VARCHAR(50),
      line1 VARCHAR(255) NOT NULL,
      line2 VARCHAR(255),
      pincode INTEGER,
      group_id INTEGER,
      location POINT
    );
        `,
    corporateCartTable:`
     CREATE TABLE IF NOT EXISTS corporate_cart (
      corporatecart_id SERIAL PRIMARY KEY,
      customer_id INTEGER,
      cart_order_details JSON,
      total_amount FLOAT,
      FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
    );
    `,
   
  paymentTable:`
  CREATE TABLE IF NOT EXISTS payment (
payment_id SERIAL PRIMARY KEY,
payment_type VARCHAR(100),
MerchantReferenceId INTEGER,
PhonePeReferenceId VARCHAR(500),
"from" VARCHAR(500),  -- Quoted because 'from' is a reserved keyword
Instrument VARCHAR(1000),
CreationDate DATE,
TransactionDate DATE,
SettlementDate DATE,
BankReferenceNo VARCHAR(500),
Amount INTEGER,
Fee FLOAT,
IGST FLOAT,
CGST FLOAT,
SGST FLOAT,
customer_id INTEGER,
paymentDate TIMESTAMP,
FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);
`
  ,
  corporateOrdersTable:`
   CREATE TABLE IF NOT EXISTS corporate_orders (
  corporateorder_id SERIAL PRIMARY KEY,
  order_details JSON,
  customer_id INTEGER,
  total_amount FLOAT,
  payment_id INTEGER,
  customer_address TEXT,  -- Ensure ADDRESS type is valid or adjust accordingly
  order_at TIMESTAMP,
  payment_status VARCHAR(50),
  corporateorder_generated_id VARCHAR(500),
  FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
  FOREIGN KEY (payment_id) REFERENCES payment(payment_id)
);`
,
corporateOrderDetailsTable:`
CREATE TABLE IF NOT EXISTS corporateorder_details (
order_detail_id SERIAL PRIMARY KEY,
corporateorder_id INTEGER,
processing_date DATE UNIQUE,
delivery_status VARCHAR(50),
category_id INTEGER,
quantity INTEGER,
active_quantity INTEGER,
media JSON,
delivery_details JSON,
addedAt TIMESTAMP,
FOREIGN KEY (category_id) REFERENCES category(category_id),
FOREIGN KEY (corporateorder_id) REFERENCES corporate_orders(corporateorder_id)
);
`
};
