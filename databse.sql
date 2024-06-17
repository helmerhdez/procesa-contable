USE ProcesaContable;

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

CREATE TABLE role (
  role_id char(36) PRIMARY KEY,
  name varchar(255)
);

CREATE TABLE subscription_type (
  subscription_type_id char(36) PRIMARY KEY,
  name varchar(10)
);

CREATE TABLE payment_method (
  payment_method_id char(36) PRIMARY KEY,
  name varchar(10)
);

CREATE TABLE status (
  status_id char(36) PRIMARY KEY,
  name varchar(10)
);

CREATE TABLE company (
  company_id char(36) PRIMARY KEY,
  nit varchar(255) NOT NULL UNIQUE,
  name varchar(255) NOT NULL,
  address varchar(255),
  status_id char(36) NOT NULL,
  consumed_amount smallint,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP(),
  FOREIGN KEY (status_id) REFERENCES status(status_id)
);

CREATE TABLE user (
  user_id char(36) PRIMARY KEY,
  email varchar(255) NOT NULL UNIQUE,
  name varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  company_id char(36),
  role_id char(36) NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP(),
  FOREIGN KEY (company_id) REFERENCES company(company_id),
  FOREIGN KEY (role_id) REFERENCES role(role_id)
);

CREATE TABLE invoice (
  invoice_id char(36) PRIMARY KEY,
  company_id char(36) NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP(),
  modified_at timestamp DEFAULT CURRENT_TIMESTAMP(),
  file blob NOT NULL,
  FOREIGN KEY (company_id) REFERENCES company(company_id)
);

CREATE TABLE payment (
  payment_id char(36) PRIMARY KEY,
  company_id char(36) NOT NULL,
  subscription_type_id char(36) NOT NULL,
  payment_method_id char(36) NOT NULL,
  last_payment_date timestamp DEFAULT CURRENT_TIMESTAMP(),
  next_payment_date timestamp DEFAULT (CURRENT_TIMESTAMP() + INTERVAL 1 MONTH),
  amount smallint,
  total double,
  FOREIGN KEY (company_id) REFERENCES company(company_id),
  FOREIGN KEY (payment_method_id) REFERENCES payment_method(payment_method_id),
  FOREIGN KEY (subscription_type_id) REFERENCES subscription_type(subscription_type_id)
);

CREATE TABLE dian_format (
  dian_format_id char(36) PRIMARY KEY,
  name varchar(255),
  file blob NOT NULL,
  company_id char(36),
  FOREIGN KEY (company_id) REFERENCES company(company_id)
);