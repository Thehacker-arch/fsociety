from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from database import SessionLocal
from datetime import datetime, timedelta
from jose import jwt
from models import User


router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class SignUp(BaseModel):
    email: EmailStr
    username: str
    name: str
    password: str

class LoginUser(BaseModel):
    email: EmailStr
    password: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta=timedelta(hours=1)):
    to_encode = data.copy()
    to_encode.update({"exp": datetime.utcnow() + expires_delta})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


@router.post("/signup")
async def signup(data: SignUp, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(
        (User.email == data.email) | (User.username == data.username)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email or username already registered")

    hashed_password = pwd_context.hash(data.password)
    new_user = User(
        email=data.email,
        username=data.username,
        name=data.name,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    
    return {"message": "User registered successfully!"}

@router.post("/login")
async def login(data: LoginUser, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Email is incorrect.")
    if not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Password is incorrect.")
    token = create_access_token({"sub": user.email})

    return {"access_token": token, "token_type": "bearer"}