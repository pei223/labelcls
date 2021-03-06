from setuptools import setup, find_packages
from codecs import open
from os import path


def _requires_from_file(filename: str):
    return open(filename, encoding="utf-8").read().splitlines()


def _read_readme():
    return open(path.join(here, 'README.md'), encoding='utf-8').read().replace("\r", "")


here = path.abspath(path.dirname(__file__))

setup(
    name='labelcls',
    install_requires=_requires_from_file("requirements.txt"),
    packages=find_packages(),

    license='MIT',

    version='1.1.6',

    author='pei223',
    author_email='peidparc@gmail.com',
    url='https://github.com/pei223/labelcls',

    description='Annotation tool of image classification data.',
    long_description=_read_readme(),
    long_description_content_type="text/markdown",

    keywords='image-classification annotation annotation-tool',
    classifiers=[
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3.7',
    ],  # reference https://pypi.org/classifiers/
    entry_points={
        "console_scripts": [
            "labelcls=labelcls.run:main",
        ],
    },
    include_package_data=True,
)
