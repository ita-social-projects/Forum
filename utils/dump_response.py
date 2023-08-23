from json import dumps


def dump(response):
    """ Print DRF response data

        Useful for debugging tests. Prints response code and indented JSON data

    :param response: server response provided by DRF testing client (APIClient)
    """
    data = (
        dumps(response.data, indent=4, ensure_ascii=False)
        if hasattr(response, 'data') else None
    )

    print(
        f"Status code:\n"
        f"{response.status_code}\n\n"
        f"Data:\n"
        f"{data}\n"
    )
