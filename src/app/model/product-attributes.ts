import {Attributes} from './attributes';
export class ProductAttributes {
    productAttributeKeyId:number;
    productCategoryName:String;
    productSubCategoryName:String;
    
    attributesPair:Map<String,Attributes[]>;
    createdBy:String;
}

