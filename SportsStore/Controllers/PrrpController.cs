using SportsStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace SportsStore.Controllers
{
    public class PrrpController : Controller
    {

        IRepository repository;
        public PrrpController()
        {
            this.repository = new ProductRepository();//没有解耦
        }
        // GET: Prrp
        public ActionResult Index()
        {
            return View(this.repository.Products);
        }

        public async Task<ActionResult> SaveProduct(Product product)
        {
            await this.repository.SaveProductAsync(product);
            return RedirectToAction("Index");
        }

        public async Task<ActionResult> DeleteProduct(int id)
        {
            await this.repository.DeleteProductAsync(id);
            return RedirectToAction("Index");
        }

        public ActionResult Orders()
        {
            return View(this.repository.Orders);
        }

        public async Task<ActionResult> SaveOrder(Order order)
        {
            await this.repository.SaveOrderAsync(order);
            return RedirectToAction("Orders");
        }

        public async Task<ActionResult> DeleteOrder(int id)
        {
            await this.repository.DeleteOrderAsync(id);
            return RedirectToAction("Orders");
        }



    }
}