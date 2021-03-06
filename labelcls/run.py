import eel
from labelcls.app.presenter import *  # required
import os
import socket
from tkinter import Tk
from tkinter import messagebox

root = Tk()
root.attributes('-topmost', True)
root.withdraw()


def is_port_used(host: str, port: int) -> bool:
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result_code = sock.connect_ex((host, port))
    sock.close()
    return result_code == 0


def main():
    port = 12225
    host = "localhost"
    if is_port_used(host, port):
        messagebox.showerror("Error", f"Port {port} is not opened. \nPlease open the port.")
        return

    eel.init(os.path.dirname(os.path.abspath(__file__)) + "/view", allowed_extensions=['.js', '.html', '.css'])
    eel.start("html/classification.html", port=port)


if __name__ == "__main__":
    main()
