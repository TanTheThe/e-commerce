from fastapi import HTTPException, status

class ProductException:
    @staticmethod
    def not_found_to_delete():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "message": "Không tìm thấy sản phẩm để xóa",
                "error_code": "product_001",
            },
        )

    @staticmethod
    def invalid_name():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "message": "Tên sản phẩm không hợp lệ",
                "error_code": "product_002",
            },
        )

    @staticmethod
    def invalid_images():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "message": "Sản phẩm cần phải có ít nhất một tấm ảnh",
                "error_code": "product_003",
            },
        )

    @staticmethod
    def invalid_categories():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "message": "Sản phẩm phải thuộc ít nhất một danh mục.",
                "error_code": "product_004",
            },
        )

    @staticmethod
    def invalid_variant():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "message": "Sản phẩm phải có ít nhất một biến thể.",
                "error_code": "product_005",
            },
        )

    @staticmethod
    def not_found():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "message": "Không tìm thấy sản phẩm",
                "error_code": "product_006",
            },
        )

    @staticmethod
    def empty_list():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "message": "Không tìm thấy bất cứ sản phẩm nào",
                "error_code": "product_007",
            },
        )

    @staticmethod
    def not_enough_infor_to_update():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "message": "Không cung cấp đủ thông tin để cập nhật",
                "error_code": "product_008",
            },
        )

    @staticmethod
    def not_found_variant_to_delete():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "message": "Không tìm thấy biến thể sản phẩm để xóa",
                "error_code": "product_009",
            },
        )

    @staticmethod
    def not_found_variant():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "message": "Không tìm thấy biến thể sản phẩm",
                "error_code": "product_010",
            },
        )