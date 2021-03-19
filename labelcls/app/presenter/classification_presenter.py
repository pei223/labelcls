from typing import List, Dict, Tuple
from tkinter import filedialog
import eel
from pathlib import Path
from tkinter import Tk
from PIL import Image
import base64
from io import BytesIO

root = Tk()
root.attributes('-topmost', True)
root.withdraw()


@eel.expose
def load_image(filepath: str) -> Tuple[str, int, int]:
    image: Image.Image = Image.open(filepath)
    image = image.convert("RGB")
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue())
    return f"data:image/jpeg;base64,{str(img_str)[2:-1]}", image.size[0], image.size[1]


@eel.expose
def load_filepath_list() -> List[str]:
    folderpath = filedialog.askdirectory()
    if folderpath is None:
        return []
    folderpath = Path(folderpath)
    valid_extensions = [
        "*.png", "*.jpg", "*.jpeg"
    ]

    file_list = []
    for extension in valid_extensions:
        file_list += list(folderpath.glob(extension))
    file_list = list(map(lambda path: str(path), file_list))
    file_list.sort()
    return file_list


@eel.expose
def load_labels_from_file():
    filepath = filedialog.askopenfile(filetype=[("テキストファイル", "*.txt")])
    if filepath is None:
        return
    labels = []
    filepath = filepath.name
    with open(filepath, "r") as file:
        for line in file:
            label_name = line.replace("\n", "")
            labels.append(label_name)
    return labels


@eel.expose
def save_labels_to_file(labels: List[str]) -> bool:
    filepath = filedialog.asksaveasfile(filetype=[("テキストファイル", "*.txt")])
    if filepath is None:
        return False
    filepath = filepath.name
    with open(filepath, "w") as file:
        for line in labels:
            file.write(f"{line}\n")
    return True


@eel.expose
def write_csv_result(result_dict: Dict[str, List[int]]):
    filepath = filedialog.asksaveasfile(filetype=[("CSVファイル", "*.csv")])
    if filepath is None:
        return False
    filepath = filepath.name
    # TODO ファイルパスかファイル名か
    with open(filepath, "w") as file:
        file.write("filepath,label\n")
        for item in result_dict.items():
            file.write(f"{item[0]},{','.join(item[1])}\n")


@eel.expose
def read_csv_result():
    filepath = filedialog.askopenfile(filetype=[("CSVファイル", "*.csv")])
    if filepath is None:
        return
    result = {}
    filepath = filepath.name
    with open(filepath, "r") as file:
        file.readline()  # read header
        for line in file:
            line = line.replace("\n", "")
            field = line.split(",")
            filename = field[0]
            labels = field[1:] or []
            result[filename] = labels
    return result
