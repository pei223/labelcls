import eel
from app.presenter import *

eel.init("view", allowed_extensions=['.js', '.html', '.css'])

eel.start("html/classification.html", port=9999)
