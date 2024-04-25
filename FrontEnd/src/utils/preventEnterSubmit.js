const preventEnterSubmit = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
};

export default preventEnterSubmit;