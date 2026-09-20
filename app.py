import webview
from core.api import StructraAPI


def main():
    api = StructraAPI()

    window = webview.create_window(
        title="Structra",
        url="http://localhost:5173",
        js_api=api,
        width=1200,
        height=800,
        min_size=(900, 600),
    )

    api.window = window

    webview.start(
        debug=True,
    )


if __name__ == "__main__":
    main()