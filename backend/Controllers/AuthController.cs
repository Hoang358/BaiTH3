using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;   // Sử dụng namespace backend mới
using backend.Models; // Sử dụng namespace backend mới

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            // Kiểm tra xem email đã tồn tại chưa
            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
            {
                return BadRequest("Email này đã được sử dụng.");
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Đăng ký tài khoản thành công!" });
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User loginInfo)
        {
            // Tìm user khớp cả Email và Password
            var user = await _context.Users.FirstOrDefaultAsync(u => 
                u.Email == loginInfo.Email && u.Password == loginInfo.Password);

            if (user == null)
            {
                return Unauthorized("Email hoặc mật khẩu không chính xác.");
            }

            // Trả về thông tin user (trong thực tế nên dùng JWT Token)
            return Ok(user);
        }
    }
}