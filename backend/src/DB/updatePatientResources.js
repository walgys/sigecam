const mysqlConn = require('./connectDB');

const updatePatientResources = async (paciente) => {
  const conn = await mysqlConn.getConnection();
  try {
  } catch (err) {
    console.log(err);
  } finally {
    conn.removeAllListeners();
    conn.release();
  }
};

module.exports = {
  updatePatientResources,
};
