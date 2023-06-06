"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const special_routes_1 = __importDefault(require("./routes/special.routes"));
const zone_routes_1 = __importDefault(require("./routes/zone.routes"));
const specie_routes_1 = __importDefault(require("./routes/specie.routes"));
const animal_routes_1 = __importDefault(require("./routes/animal.routes"));
const comment_routes_1 = __importDefault(require("./routes/comment.routes"));
const search_routes_1 = __importDefault(require("./routes/search.routes"));
// Initializations
const app = (0, express_1.default)();
// Settings
app.set("port", process.env.PORT || 3000);
// Middlewares
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
// Routes
app.get("/", (req, res) => {
    res.send(`THE API IS AT http://localhost:${app.get("port")}`);
});
app.use(auth_routes_1.default);
app.use(special_routes_1.default);
app.use(zone_routes_1.default);
app.use(specie_routes_1.default);
app.use(animal_routes_1.default);
app.use(comment_routes_1.default);
app.use(search_routes_1.default);
exports.default = app;
// Middleware para proteger rutas
exports.requireAdmin = passport_1.default.authenticate("jwt", { session: false });
