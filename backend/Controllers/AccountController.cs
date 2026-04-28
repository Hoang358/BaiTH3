using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;   
using backend.Models; 

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AccountController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/account
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TradingAccount>>> GetAccounts()
        {
            return await _context.TradingAccounts.ToListAsync();
        }

        // POST: api/account
        [HttpPost]
        public async Task<ActionResult<TradingAccount>> PostAccount(TradingAccount account)
        {
            _context.TradingAccounts.Add(account);
            await _context.SaveChangesAsync();
            

            return Ok(account);
        }

        // DELETE: api/account/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            var account = await _context.TradingAccounts.FindAsync(id);
            if (account == null)
            {
                return NotFound("Không tìm thấy tài khoản để xóa.");
            }

            _context.TradingAccounts.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent(); 
        }
    }
}