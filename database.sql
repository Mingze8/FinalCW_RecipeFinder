CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE ingredients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255)
);

CREATE TABLE user_ingredients (
  user_id INT,
  ingredient_id INT,
  amount INT,
  FOREIGN KEY (user_id) REFERENCES users(id), 
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
  PRIMARY KEY (user_id, ingredient_id)
);