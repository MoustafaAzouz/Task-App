"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
const User_entity_1 = require("../auth/entities/User.entity");
let TaskService = class TaskService {
    constructor(taskRepository, userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }
    async create(createTaskDto) {
        const user = await this.userRepository.findOne({ where: { name: createTaskDto.userName } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const newTask = this.taskRepository.create({
            ...createTaskDto,
            userId: user.id,
        });
        return await this.taskRepository.save(newTask);
    }
    async findAllByUserId(userId) {
        return this.taskRepository.find({ where: { userId } });
    }
    async findById(id, user) {
        const task = await this.taskRepository.findOne({
            where: { id, user: { id: user.id } },
            relations: ['user'],
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found.`);
        }
        return task;
    }
    async updateById(id, updateTaskDto, user) {
        const task = await this.findById(id, user);
        if (!Object.keys(updateTaskDto).length) {
            throw new common_1.BadRequestException('No update data provided.');
        }
        Object.assign(task, updateTaskDto);
        const updatedTask = await this.taskRepository.save(task);
        return updatedTask;
    }
    async deleteById(id, user) {
        const task = await this.findById(id, user);
        await this.taskRepository.remove(task);
    }
    async getTasksByCategory(category, userId) {
        const tasks = await this.taskRepository.find({
            where: { category, userId }
        });
        if (tasks.length === 0) {
            throw new common_1.NotFoundException(`No tasks found for category: ${category}`);
        }
        return tasks;
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(1, (0, typeorm_1.InjectRepository)(User_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TaskService);
//# sourceMappingURL=task.service.js.map