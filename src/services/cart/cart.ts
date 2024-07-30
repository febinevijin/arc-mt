import { generateAPIError } from "../../errors/apiError.js";
import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";



// Function to get product price
const getProductPrice = async (productId: string): Promise<number> => {
  const product = await Product.findById(productId);
  return product ? product.price : 0;
};

const addProductToCart = async (
    userId: string,
    productId: string,
    quantity: number,
): Promise<any> => {
  // Check if the product is already in the cart
    const existingCartItem = await Cart.findOne({ userId, productId });
    if (existingCartItem) {
      // Update the quantity of the existing item
      existingCartItem.quantity = quantity;
      existingCartItem.price = await getProductPrice(productId); // Update price if needed
        await existingCartItem.save();
      
    } else {
      // Create a new cart item
      const productPrice = await getProductPrice(productId); // Function to get product price
      const newCartItem = new Cart({
        userId,
        productId,
        quantity,
        price: productPrice,
      });
      await newCartItem.save();
    }
      return {
            message:"product added to cart successfully"
        }
};

const removeProductFromCart = async (
  userId: string,
  productId: string
): Promise<any> => {
  await Cart.deleteOne({ userId, productId });
  return Cart.find({ userId }).populate("productId");; // Return the updated cart for the user
};

const getCart = async (userId: string): Promise<any> => {
  const cartItems = await Cart.find({ userId }).populate("productId");
  return cartItems;
};

export const cartService = {
  addProductToCart,
  removeProductFromCart,
  getCart,
};