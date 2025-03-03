import MyStructureGenModel from '../models/MyStructureGenModel';

export const generate_app_structure_with_model = (appType) => {
    const structure = MyStructureGenModel.generate_structure(appType);
    return structure;
};