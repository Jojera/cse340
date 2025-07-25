-- Query 1 - Inserting new record into the account table
INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password) 
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

--Query 2 - Modification of the Tony Stark record to change the account_type to 'Admin'
UPDATE public.account
SET account_type = 'Admin'
WHERE account_id = 1;

-- Query 3 - Deleting the Tony Stark record from the database
DELETE FROM public.account
WHERE account_id = 1;

-- Query 4 - Modifying the 'GM Hummer' record to read 'a huge interior' rather than 'small interiors'
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_id = 10;

-- Query 5 - Using inner join to select make and model fields in the inventory table 
-- and classiffication name field from classification table for inventory items that
-- belong to the 'Sport' category.
SELECT inv_make, inv_model, classification_name
FROM public.inventory inv
	INNER JOIN public.classification cla
		ON inv.classification_id = cla.classification_id
WHERE classification_name = 'Sport';

-- Query 6 - Updating all inv_image and inv_thumbnail to add '/vehicles'
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images', '/images/vehicles'),
	inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/images/vehicles');

