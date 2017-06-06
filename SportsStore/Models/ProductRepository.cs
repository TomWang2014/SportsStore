using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SportsStore.Models
{
    public class ProductRepository : IRepository
    {
        private ProductDbContext context = new ProductDbContext();

        public IEnumerable<Product> Products { get { return context.Products; } }

        public IEnumerable<Order> Orders { get { return context.Orders.Include("Lines").Include("Lines.Product"); } }

        public async Task<Order> DeleteOrderAsync(int orderID)
        {
            Order dbOrder = this.context.Orders.Find(orderID);
            if (dbOrder != null)
            {
                this.context.Orders.Remove(dbOrder);
            }
            await this.context.SaveChangesAsync();
            return dbOrder;
        }

        public async Task<Product> DeleteProductAsync(int productID)
        {
            Product dbProduct = this.context.Products.Find(productID);
            if (dbProduct != null)
            {
                this.context.Products.Remove(dbProduct);
            }
            await this.context.SaveChangesAsync();
            return dbProduct;
        }

        public async Task<int> SaveOrderAsync(Order order)
        {
            if (order.Id == 0)
            {
                this.context.Orders.Add(order);
            }
            return await this.context.SaveChangesAsync();
        }

       

        public async Task<int> SaveProductAsync(Product product)
        {
            if (product.Id == 0)
            {
                this.context.Products.Add(product);
            }
            else
            {
                Product dbProduct = this.context.Products.Find(product.Id);
                if (dbProduct != null)
                {
                    dbProduct.Name = product.Name;
                    dbProduct.Category = product.Category;
                    dbProduct.Description = product.Description;
                    dbProduct.Price = product.Price;
                }
            }

            return await this.context.SaveChangesAsync();
        }
    }
}