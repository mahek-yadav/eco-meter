# EcoMeter API Endpoint Summary

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | /api/auth/register | No | Register user |
| POST | /api/auth/login | No | Login and receive JWT |
| POST | /api/auth/firebase-login | Firebase | Verify Firebase ID token |
| POST | /api/readings | JWT/Firebase | Log energy reading |
| GET | /api/readings | JWT/Firebase | Get user's readings |
| GET | /api/readings/device/:id | JWT/Firebase | Get readings for a device |
| GET | /api/devices | JWT/Firebase | List devices |
| GET | /api/devices/:id | JWT/Firebase | Get one device |
| POST | /api/devices | JWT/Firebase | Create device |
| PUT | /api/devices/:id | JWT/Firebase | Update device |
| DELETE | /api/devices/:id | JWT/Firebase | Delete device |
| POST | /api/devices/:id/control | JWT/Firebase | Turn device on/off |
| GET | /api/bills | JWT/Firebase | Current usage/bill estimate |
| GET | /api/bills/predict | JWT/Firebase | Predict future bill |
| GET | /api/bills/monthly | JWT/Firebase | Monthly bill estimate |
| GET | /api/tips | JWT/Firebase | View energy-saving tips |
| POST | /api/tips | Admin | Add a tip |
| GET | /api/alerts | JWT/Firebase | View alerts |
| POST | /api/alerts/check | JWT/Firebase | Check reading against threshold |
| POST | /api/notifications/send | JWT/Firebase | Send Firebase push notification |
