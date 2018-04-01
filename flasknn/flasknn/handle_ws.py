
class WS_Handler():

    def __init__(self, data):
        if(data["type"] == "blob"):
            imgBin = data.get(["blobData"], False)
