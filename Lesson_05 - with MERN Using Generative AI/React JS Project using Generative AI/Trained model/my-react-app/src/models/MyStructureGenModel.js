class MyStructureGenModel {
    static generate_structure(user_input) {
        switch (user_input.toLowerCase()) {
            case 'web':
                return {
                    web_app: ['static', 'templates', 'config']
                };
            case 'mobile':
                return {
                    mobile_app: ['ui', 'logic', 'resources']
                };
            default:
                return {
                    custom_app: []
                };
        }
    }
}

export default MyStructureGenModel;