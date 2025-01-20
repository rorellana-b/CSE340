--task 1
--Data for table `account`
INSERT INTO public.account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (
        'Tony',
        'Stark',
        'tony@starkent.com',
        'Iam1ronM@n'
    );
--task 2
--Update account_type for account_id = 1
UPDATE public.account
SET account_type = 'Admin'
WHERE account_id = 1;
--task 3
--Delete the Tony Stark record 
DELETE FROM public.account
WHERE account_id = 1;
--task 4
--Update the inv_description for inv_id = 10
UPDATE public.inventory
SET inv_description = REPLACE (
        inv_description,
        'small interiors',
        'a huge interior'
    )
WHERE inv_id = 10;
--task 5
--Using INNER JOIN from the inventory table and classification table
SELECT i.inv_make,
    i.inv_model
FROM public.inventory i
    INNER JOIN public.classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';
--task 6
--Replace or add url image 
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');