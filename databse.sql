USE ProcesaContable;

-- Drop existing tables (if any) in reverse order (dependent tables first)
DROP TABLE IF EXISTS dian_format;
DROP TABLE IF EXISTS payment;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS invoice;
DROP TABLE IF EXISTS company;
DROP TABLE IF EXISTS legal_representative;
DROP TABLE IF EXISTS status;
DROP TABLE IF EXISTS payment_method;
DROP TABLE IF EXISTS subscription_type;
DROP TABLE IF EXISTS role;

-- Create tables in a proper order (independent tables first)
CREATE TABLE role (
  role_id binary(16) PRIMARY KEY,
  name varchar(255)
);

CREATE TABLE subscription_type (
  subscription_type_id binary(16) PRIMARY KEY,
  name varchar(10)
);

CREATE TABLE payment_method (
  payment_method_id binary(16) PRIMARY KEY,
  name varchar(10)
);

CREATE TABLE status (
  status_id binary(16) PRIMARY KEY,
  name varchar(10)
);

CREATE TABLE legal_representative (
  legal_representative_id binary(16) PRIMARY KEY,
  identification_number varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL
);

CREATE TABLE company (
  company_id binary(16) PRIMARY KEY,
  nit varchar(255) NOT NULL UNIQUE,
  name varchar(255) NOT NULL,
  address varchar(255),
  legal_representative_id binary(16) NOT NULL,
  status_id binary(16) NOT NULL,
  consumed_amount smallint,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP(),
  FOREIGN KEY (legal_representative_id) REFERENCES legal_representative(legal_representative_id),
  FOREIGN KEY (status_id) REFERENCES status(status_id)
);

-- Tables referencing company can be created now
CREATE TABLE user (
  user_id binary(16) PRIMARY KEY,
  email varchar(255) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  company_id binary(16),
  role_id binary(16) NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP(),
  FOREIGN KEY (company_id) REFERENCES company(company_id),
  FOREIGN KEY (role_id) REFERENCES role(role_id)
);

CREATE TABLE invoice (
  invoice_id binary(16) PRIMARY KEY,
  company_id binary(16) NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP(),
  modified_at timestamp DEFAULT CURRENT_TIMESTAMP(),
  file blob NOT NULL,
  FOREIGN KEY (company_id) REFERENCES company(company_id)
);

CREATE TABLE payment (
  payment_id binary(16) PRIMARY KEY,
  company_id binary(16) NOT NULL,
  subscription_type_id binary(16) NOT NULL,
  payment_method_id binary(16) NOT NULL,
  last_payment_date timestamp DEFAULT CURRENT_TIMESTAMP(),
  next_payment_date timestamp DEFAULT (CURRENT_TIMESTAMP() + INTERVAL 1 MONTH),
  amount smallint,
  total double,
  FOREIGN KEY (company_id) REFERENCES company(company_id),
  FOREIGN KEY (payment_method_id) REFERENCES payment_method(payment_method_id),
  FOREIGN KEY (subscription_type_id) REFERENCES subscription_type(subscription_type_id)
);

CREATE TABLE dian_format (
  dian_format_id binary(16) PRIMARY KEY,
  name varchar(255),
  file blob NOT NULL,
  company_id binary(16),
  FOREIGN KEY (company_id) REFERENCES company(company_id)
);