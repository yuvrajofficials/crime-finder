import pool from "../config/db.js"
const getNotification = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM verificationusers WHERE status = $1",
      ['criminal']
    );

    res.status(200).json({
      success: true,
      count: result.rowCount,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export {getNotification}