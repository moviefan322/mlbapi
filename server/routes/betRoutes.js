const { getBets, placeBet, getBet } = require("../controllers/betController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getBets).post(protect, placeBet);

router.route("/:id").get(getBet).put(protect, updateBet);

module.exports = router;
