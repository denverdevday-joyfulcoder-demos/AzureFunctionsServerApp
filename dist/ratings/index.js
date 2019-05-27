"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ratings = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        let rating = '';
        let score = +req.query.score;
        if (isNaN(score) && req.body && req.body.scores && req.body.scores.length) {
            let total = 0;
            req.body.scores.forEach(item => {
                total += +item;
            });
            score = total / req.body.scores.length;
        }
        if (score >= .7) {
            rating = 'good';
        }
        else if (score >= .3) {
            rating = 'bad';
        }
        else if (score >= 0) {
            rating = 'ugly';
        }
        if (rating) {
            context.res = {
                body: rating
            };
        }
        else {
            context.res = {
                status: 400,
                body: "Please provide a numeric score between 0 and 1."
            };
        }
    });
};
exports.default = ratings;
//# sourceMappingURL=index.js.map