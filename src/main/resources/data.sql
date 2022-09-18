INSERT INTO roles VALUES (1, 'ROLE_USER'),
                         (2, 'ROLE_ADMIN');

INSERT INTO users VALUES (1, 10, 'u', '$2a$12$25IAoGtO2bVWHGplE8giK.uxG0UzQrTUfooIKwIBcLfw9K0UMSMF.', 'user'),
                         (2, 20, 'a', '$2a$12$dABWEDpvGLX0Z62JHekkrujxFC3XytW8F3yOM8jR2gmZ4lUWQitZK', 'adm');

INSERT INTO users_roles VALUES (1, 1),
                               (2, 1),
                               (2, 2);