CREATE TABLE predefined_risks (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL
);


INSERT INTO predefined_risks (type, description) VALUES
('Fire', 'A fire is an uncontrolled burning of a substance, which may result in the destruction of buildings or natural habitats. It poses significant danger to life and property.'),
('Flood', 'A flood occurs when water overflows from rivers, lakes, or other water bodies, leading to submersion of land. Floods can cause extensive damage to homes, infrastructure, and agriculture.'),
('Earthquake', 'An earthquake is a sudden and violent shaking of the ground, caused by movements along fault lines in the Earth''s crust. Earthquakes can cause significant structural damage and loss of life.'),
('Power Outage', 'A power outage is a loss of electrical power supply in a particular area. It can disrupt daily activities, affect businesses, and impact critical services like healthcare and emergency systems.'),
('Cyber Attack', 'A cyber attack involves unauthorized access to computer systems or networks with the intent to steal, alter, or destroy data. It can lead to data breaches, financial loss, and damage to reputation.'),
('Tornado', 'A tornado is a rapidly rotating column of air extending from a thunderstorm to the ground. Tornadoes can cause severe damage with high winds and are often associated with hail and lightning.'),
('Hurricane', 'A hurricane is a large, organized system of clouds and thunderstorms featuring a clearly defined circulation pattern. Hurricanes can cause widespread flooding, strong winds, and storm surges.'),
('Landslide', 'A landslide is the downward movement of soil, rock, or debris on a slope. Landslides can be triggered by heavy rainfall, earthquakes, or volcanic activity and can cause property damage and loss of life.'),
('Terrorist Attack', 'A terrorist attack is a deliberate act of violence intended to cause fear and harm. It can target individuals, communities, or critical infrastructure and often has widespread social and economic impacts.'),
('Chemical Spill', 'A chemical spill involves the release of hazardous substances into the environment. It can lead to contamination of land, water, and air, posing health risks to humans and wildlife.'),
('Drought', 'A drought is an extended period of below-average rainfall, leading to water shortages. It can affect agriculture, water supply, and increase the risk of wildfires and other environmental issues.'),
('Pandemic', 'A pandemic is the widespread occurrence of an infectious disease across a large region or globally. It can cause significant health impacts, strain healthcare systems, and disrupt daily life.'),
('Industrial Accident', 'An industrial accident occurs in a workplace setting and can involve machinery failure, chemical leaks, or other hazards. It can lead to injuries, fatalities, and economic loss.'),
('Biological Hazard', 'A biological hazard involves exposure to harmful biological agents, such as bacteria, viruses, or fungi. It can pose health risks through infections or toxic reactions.'),
('Radiological Hazard', 'A radiological hazard involves exposure to harmful radiation from sources such as radioactive materials. It can lead to serious health effects including cancer and radiation sickness.');


CREATE TABLE risk_assessments (
    id SERIAL PRIMARY KEY,
    risk_type VARCHAR(255) NOT NULL,
    risk_level INTEGER NOT NULL CHECK (risk_level >= 1 AND risk_level <= 10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (risk_type) REFERENCES predefined_risks(type)
);


INSERT INTO risk_assessments (risk_type, risk_level) VALUES
('Fire', 5),
('Flood', 7),
('Earthquake', 9),
('Power Outage', 3),
('Cyber Attack', 8),
('Tornado', 6),
('Hurricane', 7),
('Landslide', 4),
('Terrorist Attack', 9),
('Chemical Spill', 5),
('Drought', 4),
('Pandemic', 10),
('Industrial Accident', 6),
('Biological Hazard', 7),
('Radiological Hazard', 8);

select * from risk_assessments;

DROP TABLE tasks;


-- Create the volunteers table
CREATE TABLE volunteers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create the tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    volunteer_id INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'In Progress',
    FOREIGN KEY (volunteer_id) REFERENCES volunteers(id)
);

-- Insert sample data into the volunteers table
INSERT INTO volunteer (name) VALUES 
('John Doe'),
('Jane Smith'),
('Emily Johnson');

select * from volunteer;

-- Insert sample data into the tasks table
INSERT INTO tasks (description, volunteer_id, status) VALUES 
('Distribute supplies', 1, 'In Progress'),
('Setup emergency shelter', 2, 'Done'),
('Assist with first aid', 1, 'In Progress');

-- Create the resources table
CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity VARCHAR(50) NOT NULL
);

-- Insert sample data into the resources table
INSERT INTO resources (name, quantity) VALUES 
('First Aid Kits', '50'),
('Water Bottles', '200'),
('Food Packs', '150'),
('Shelter Materials', '30'),
('Medical Supplies', '100');




-- Create the communications table
CREATE TABLE communications (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL
);

-- Insert sample data into the communications table (optional)
INSERT INTO communications (message, timestamp) VALUES 
('Initial communication log entry', '2023-01-01T10:00:00Z'),
('Second communication entry', '2023-01-01T12:00:00Z');

-- Create the emergency_scenarios table
CREATE TABLE emergency_scenarios (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

-- Insert sample data into the emergency_scenarios table (optional)
INSERT INTO emergency_scenarios (type, description) VALUES 
('Fire', 'A fire emergency scenario describing the steps to take in case of a fire.'),
('Flood', 'A flood emergency scenario describing the steps to take in case of a flood.');

select * from emergency_scenarios;

select * from communications;

select * from risk_assessments;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

select * from users;

INSERT INTO users (username, password) VALUES ('testuser', 'testpassword');

select * from emergency_scenarios;

select * from volunteer;




