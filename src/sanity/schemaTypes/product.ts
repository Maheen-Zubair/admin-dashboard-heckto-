import { Rule } from "sanity";

export default {
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name',
        validation: (Rule: Rule) => Rule.required().error('Name is required'),
      },
      {
        name: 'image',
        type: 'image',
        title: 'Image',
        options: {
          hotspot: true,
        },
        description: 'Upload an image of the product.',
      },
      {
        name: 'price',
        type: 'string',
        title: 'Price',
        validation: (Rule: Rule) => Rule.required().error('Price is required'),
      },
      {
        name: 'description',
        type: 'text',
        title: 'Description',
        validation: (Rule: Rule) =>
          Rule.max(150).warning('Keep the description under 150 characters.'),
      },
      {
        name: 'discountPercentage',
        type: 'number',
        title: 'Discount Percentage',
        validation: (Rule: Rule) =>
          Rule.min(0).max(100).warning('Discount must be between 0 and 100.'),
      },
      {
        name: 'isFeaturedProduct',
        type: 'boolean',
        title: 'Is Featured Product',
      },
  
      {
        name: 'stockLevel',
        type: 'number',
        title: 'Stock Level',
        validation: (Rule: Rule) => Rule.min(0).error('Stock level must be a positive number.'),
      },
      {
        name: 'quantity',
        type: 'number',
        title: 'Quantity',
        validation: (Rule: Rule) => Rule.min(0).error('Stock level must be a positive number.'),
      },
      {
        name: 'category',
        type: 'string',
        title: 'Category',
        options: {
          list: [
            { title: 'Chair', value: 'Chair' },
            { title: 'Sofa', value: 'Sofa' },
          ],
        },
        validation: (Rule: Rule) => Rule.required().error('Category is required'),
      },
      {name:"tags",
        title:"Tags",
        type:"array",
        of: [{type:"string"}],
        options:{
          list:[
            {title:"featured",value:"featured"},
            {title:"latest",value:"latest"},
            {title:"unique",value:"unique"},
            {title:"trending",value:"trending"},
            {title:"discount",value:"discount"},
            {title:"top",value:"top"},
            {title:"allProducts",value:"allProducts"},
            {title:"Executive Seat",value:"executiveSeat"},
            {title:"Wooden",value:"wooden"},
  
  
          ]
        }
      },
  {
    name: "reviews",
    type: "array",
    of: [
      {
        type: "object",
        fields: [
          { name: "username", type: "string" , title: "UserName" },
          { name: "reviewText", type: "text", title: "Review Text"},
        ],
      },
    ],
  }
    ],
    
  };