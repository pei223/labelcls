from setuptools import setup
from codecs import open
from os import path
from setuptools import find_packages

here = path.abspath(path.dirname(__file__))

with open(path.join(here, 'README.md'), encoding='utf-8') as f:
    long_description = f.read()

setup(
    name='labelcls',
    packages=find_packages(),
    package_data={
        "view": ["labelcls/view/*"],
    },
    license='MIT',

    version='1.0.15',
    install_requires=['Pillow>=7.2.0', 'bottle>=0.12.18', 'eel>=0.11.0'],

    author='pei223',
    author_email='peidparc@gmail.com',
    url='https://github.com/pei223/labelcls',

    description='Annotation tool of image classification data.',
    long_description=long_description,
    long_description_content_type='text/markdown',

    keywords='image-classification annotation annotation-tool',
    classifiers=[
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3.7',
    ],  # パッケージ(プロジェクト)の分類。https://pypi.org/classifiers/に掲載されているものを指定可能。

    entry_points={
        "console_scripts": [
            "labelcls=labelcls.run:main",
        ],
    },
)
