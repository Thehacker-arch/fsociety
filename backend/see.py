from sqlalchemy.orm import Session
from tabulate import tabulate
from database import SessionLocal
from models import User

db: Session = SessionLocal()

users = db.query(User).all()

print([type(User.hashed_password)])

user_data = [[user.username, user.email, user.name, user.hashed_password] for user in users]
print(tabulate(user_data, headers=["Username", "Email", "Name", "Password"], tablefmt="grid"))

db.close()
