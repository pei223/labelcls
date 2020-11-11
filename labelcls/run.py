import eel
from labelcls.app.presenter import *


def main():
    eel.init("labelcls/view", allowed_extensions=['.js', '.html', '.css'])

    eel.start("html/classification.html", port=9999)


if __name__ == "__main__":
    main()
