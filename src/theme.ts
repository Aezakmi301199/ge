export const theme = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
    down: function (key: keyof typeof this.values) {
      return `@media (max-width:${this.values[key]}px)`;
    },
  },
  action: {
    selected: '#131D3514',
    selected_primary: '#0f42f1',
    active: '#131D358A',
  },
  link: {
    default: '#154EF9',
    selected_primary: '#154ef9',
  },
  padding: {
    body: '24px',
  },
  base: {
    default: {
      main: {
        button: '#F1F5F9',
      },
      dark: {
        button: '#CBD5E1',
      },
      light: {
        bg: '#F8FAFC',
      },
    },
    primary: {
      main: '#154EF9',
      contrast: '#FFFFFF',
      outlined_border: '#154EF980',
      dark: '#0F3BD6',
      hover: '#154EF90A',
    },
    secondary: {
      main: '#6c757d',
      light: '#a0a4a8',
      dark: '#494e52',
      contrast_text: '#ffffff',
      white: '#FFFFFF99',
    },
    info: {
      dark: '#0183C4',
    },
    error: {
      main: '#FC3C2A',
      text: '#920D22',
      dark: '#D81F1E',
    },
    warning: {
      main: '#FFB238',
    },
    neutral: {
      main: '#2B2B2B',
    },
    success: {
      text: '#189A19',
    },
    module: {
      '0_5': '4px',
      '1': '8px',
      '1_5': '12px',
      '2': '16px',
      '2_5': '20px',
      '3': '24px',
      '3_5': '28px',
      '4': '32px',
      '4_5': '36px',
      '5': '40px',
    },
  },
  icon: {
    icon_lg: '32px',
  },
  common: {
    input: {
      shape: {
        border_radius: '8px',
      },
      padding: {
        pad_y_sm: '14px',
        pad_x_sm: '8px',
      },
    },
  },
  chips: {
    padding: {
      py_sm: '3px',
    },
  },
  button: {
    gap: '8px',
    padding: {
      py_md: '6px',
      py_lg: '8px',
      px_md: '16px',
      py_sm: '4px',
      px_sm: '10px',
      px_lg: '22px',
    },
    icon: {
      icon_lg: '24px',
    },
  },
  border: {
    default: '1px solid #D1D1D1',
  },
  text: {
    text_white: '#ffffff',
    text_dark: '#1A1A1ADE',
    primary: '#1A1A1ADE',
    secondary: '#1A1A1A99',
    hover: '#131D350A',
    white: '#FFFFFF',
    disabled: '#1a1a1a61',
  },
  bg: {
    clear: 'rgba(255, 255, 255, 0.4)',
    button: {
      white: {
        default: '#FFFFFF',
      },
      dark: {
        default: '#454545',
        hover: '#767676',
      },
    },
    bg: {
      bg_lv: '#F4F4F4',
      dark: '#1A1A1A',
    },
    input_bg: '#ffffff',
  },
  layout: {
    padding_xl: '28px',
    padding_lg: '24px',
  },
  border_radius: {
    border_radius_sm: '4px',
    border_radius_md: '8px',
    modal: '12px',
    border_radius_lg: '12px',
  },
  gap: {
    gap_sm: '4px',
    gap_md: '8px',
    gap_lg: '12px',
    gap_xl: '16px',
    gap_2xl: '20px',
    gap_3xl: '24px',
    gap_4xl: '32px',
  },
  divider: {
    divider: '#1A1A1A29',
  },
  drawer: {
    comment: {
      width: '450px',
    },
  },
};
