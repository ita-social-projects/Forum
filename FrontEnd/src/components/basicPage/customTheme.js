const customTheme = {
    components: {
        Carousel: {
            colorBgContainer: 'var(--carousel-color)',
            dotActiveWidth: 32,
            dotWidth: 32,
            dotHeight: 6,
            lineHeight: 1,
        },
        Button: {
            defaultColor: 'var(--main-button-color)',
            colorPrimaryHover: 'var(--button-color-hover)',
            fontWeight: 600,
            contentFontSize: 16,
            fontFamilyCode: 'var(--font-main)',
        },
        Radio: {
            colorPrimary: 'var(--radio-color)',
            borderRadius: 2,
            colorBorder: 'var(--radio-color-border)',
            buttonColor: 'var(--radio-button-color)',
            fontFamily: 'var(--font-main)',
            fontSize: 'var(-radio-font-size)',
            algorithm: true,
        },
        Pagination: {
            colorPrimary: 'var(--pagination-color)',
            colorPrimaryHover: 'var(--pagination-color-hover)',
        },
        Select: {
            colorPrimary: 'var(--select-primary-color)',
            borderRadiusSM: 'var(--select-border-radius)',
            optionPadding: 'var(--select-option-padding)',
            optionFontSize: 'var(--select-option-font-size)',
            optionLineHeight: 'var(--select-option-line-height)',
            optionSelectedBg: 'var(--select-option-selected-bg)',
            optionSelectedColor: 'var(--select-option-selected-color)',
            multipleItemBorderColor: 'var(--select-multiple-color)',
            multipleItemBg: 'var(--select-multiple-bg)',
        },
        Checkbox: {
            colorPrimary: 'var(--checkbox-primary-color)',
            colorPrimaryHover: 'var(--checkbox-primary-hover-color)',
        }
    },
};

export default customTheme;
