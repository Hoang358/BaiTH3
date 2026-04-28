namespace backend.Models {
    public class TradingAccount {
        public int Id { get; set; }
        public string Type { get; set; } = "demo";
        public string Category { get; set; } = "Standard";
        public decimal Balance { get; set; }
        public decimal UsedMargin { get; set; }
        public int Leverage { get; set; }
        public int UserId { get; set; }
    }
}