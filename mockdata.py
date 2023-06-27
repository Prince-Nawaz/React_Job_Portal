import json
import random
import uuid


def generate_mock_data():
    data = []
    technologies = ["React", "Angular",
                    "Node.js", "Python", "R", "AWS", "Docker"]
    company_names = ["Acme Corporation", "InnovateTech Solutions",
                     "CyberSec Solutions", "HealthTech Innovations"]
    job_roles = ["Full Stack Developer", "Data Scientist",
                 "Security Analyst", "UX/UI Designer"]
    applied = ['true', '']
    emails = ["william.johnson@example.com",
              "sophia.anderson@example.com",
              "princenawaz007@gmail.com"
              ]

    for _ in range(10000):
        record = {
            "companyId": str(uuid.uuid4()),
            "companyName": random.choice(company_names),
            "phoneNumber": "1-XXX-XXX-XXXX",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "requirements": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "tags": random.choices(technologies, k=random.randint(2, 5)),
            "salary": f"${random.randint(30, 100)}",
            "applied": bool(random.choice(applied)),
            "applicantDetails": random.sample(emails, k=random.randint(1, 3))
        }
        data.append(record)

    return data


# Generate data
data = generate_mock_data()

# Export as JSON file
with open("mock_data.json", "w") as file:
    json.dump(data, file, indent=4)
