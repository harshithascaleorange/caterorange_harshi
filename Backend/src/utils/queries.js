const DB_COMMANDS = {
    CUSTOMER_INSERT: `
        INSERT INTO customer 
        (customer_name, customer_email, customer_password, customer_phonenumber, access_token) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *`,  
    CUSTOMER_EMAIL_SELECT: `
        SELECT * FROM customer 
        WHERE customer_email = $1`,
    CUSTOMER_SET_PASSWORD:`UPDATE customer 
        SET customer_password = $2, access_token = $3
        WHERE customer_email = $1`,
    CUSTOMER_SET_ACCESSTOKEN: `UPDATE customer 
        SET access_token = $2
        WHERE customer_email = $1`,
    GETCORPORATECATEGORY : 
        `select * from category`,
    ADDADDRESS: `
       UPDATE customer 
        SET customer_address = $1
        WHERE customer_id = $2 
    `,
    ADD_CORPORATECART:`
        INSERT INTO corporate_cart  (customer_id, category_id, processing_date, quantity) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *
    `,
    GETCARTS:`
        SELECT 
    corporate_cart.*, 
    category.category_price, 
    category.category_media, 
    category.category_name
FROM 
    corporate_cart
JOIN 
    category 
ON 
    corporate_cart.category_id = category.category_id
WHERE 
    corporate_cart.customer_id = $1
ORDER BY 
    corporate_cart.processing_date ASC;
;

    `,
    CUSTOMER_TOKEN_SELECT: `
    SELECT * FROM customer 
    WHERE access_token = $1`

};


module.exports = { DB_COMMANDS };