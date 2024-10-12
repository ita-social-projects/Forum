from passlib import pwd


def generate_password():
    return pwd.genword()
