from typing import List, Dict, Tuple, Optional
from tkinter import filedialog
import eel
from pathlib import Path
from tkinter import Tk
from tkinter import messagebox
from PIL import Image
import base64
from io import BytesIO

root = Tk()
root.attributes('-topmost', True)
root.withdraw()


@eel.expose
def load_jpeg_image_and_width_height(filepath: str) -> Optional[Tuple[str, int, int]]:
    """
    :param filepath:
    :return:
    """
    if not Path(filepath).exists():
        messagebox.showwarning("Warning", f"{filepath} is not exist.")
        return None
    image: Image.Image = Image.open(filepath)
    image = image.convert("RGB")
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue())
    return f"data:image/jpeg;base64,{str(img_str)[2:-1]}", image.size[0], image.size[1]


@eel.expose
def load_filepath_list() -> List[str]:
    dir_path = filedialog.askdirectory()
    if dir_path is None:
        return []
    dir_path = Path(dir_path)
    valid_extensions = [
        "*.png", "*.jpg", "*.jpeg", "*.bmp"
    ]

    file_list = []
    for extension in valid_extensions:
        file_list += list(dir_path.glob(extension))
    file_list = list(map(lambda path: str(path), file_list))
    file_list.sort()
    return file_list


@eel.expose
def load_labels_from_file():
    filepath = filedialog.askopenfile(filetypes=[("テキストファイル", "*.txt")])
    if filepath is None:
        return
    filepath = filepath.name
    with open(filepath, "r") as file:
        return list(map(lambda line: line.replace("\n", ""), file))


@eel.expose
def save_labels_to_file(labels: Optional[List[str]]) -> bool:
    filepath = filedialog.asksaveasfile(filetypes=[("テキストファイル", "*.txt")])
    if filepath is None:
        return False
    filepath = filepath.name
    with open(filepath, "w") as file:
        for line in labels:
            file.write(f"{line}\n")
    return True


@eel.expose
def save_csv_result(result_dict: Dict[str, List[int]]):
    """
    :param result_dict: {filepath, [labels, ...]}
    :return:
    """
    chosen_result = filedialog.asksaveasfile(filetypes=[("CSVファイル", "*.csv")])
    if chosen_result is None:
        return False
    chosen_result = chosen_result.name
    with open(chosen_result, "w") as file:
        file.write("filename,label\n")
        for item in result_dict.items():
            filename = Path(item[0]).name
            file.write(f"{filename},{','.join(item[1])}\n")


@eel.expose
def load_csv_result() -> Dict[str, List[int]]:
    """
    :return: {filename, [labels, ...]}
    """
    chosen_result = filedialog.askopenfile(filetypes=[("CSVファイル", "*.csv")])
    if chosen_result is None:
        return {}
    result = {}
    chosen_result = chosen_result.name
    with open(chosen_result, "r") as file:
        file.readline()  # read header
        for line in file:
            line = line.replace("\n", "")
            field = line.split(",")
            if len(field) == 0:
                continue
            filename = field[0]
            labels = field[1:] or []
            result[filename] = labels
        return result
