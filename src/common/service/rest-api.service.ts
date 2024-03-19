import { Injectable, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RestApi, RestApiDto } from '../models/restApi';
import { Model } from 'mongoose';
import { ModulesContainer } from '@nestjs/core';

@Injectable()
export class RestApiRervice implements OnModuleInit, OnApplicationBootstrap {
  apiList: RestApiDto[] = [];
  constructor(
    @InjectModel(RestApi.name) private readonly restModel: Model<RestApi>,
    private readonly modulesContainer: ModulesContainer) { }

  onApplicationBootstrap() {
    this.storeRestApi(this.apiList)
  }
  onModuleInit() {
    const controllers = this.getAllControllers();
    controllers.forEach(({ instance, metatype }) => {
      const controllerPath = Reflect.getMetadata('path', metatype);
      const methods = this.getControllerMethods(instance);
      methods.forEach(({ path, httpVerb }) => {
        if (httpVerb >= 0 && httpVerb <= 5) {
          const httpMethod = this.getHttpMethod(httpVerb);
          this.apiList.push({ apiName: `${controllerPath}/${path}`, apiType: httpMethod });
        }
      });
    });
  }
  async getAllRestApiList(): Promise<RestApi[]> {
    return this.restModel.find().exec();
  }
  async storeRestApi(apiList: RestApiDto[]) {
    const allApiList: RestApi[] = await this.getAllRestApiList();
    const newApiList = apiList.filter((apiItem) => {
      return !allApiList.some((existingApi) => {
        return (
          existingApi.apiName === apiItem.apiName &&
          existingApi.apiType === apiItem.apiType
        );
      });
    });
    await this.restModel.insertMany(newApiList);
  }

  private getAllControllers() {
    return [...this.modulesContainer.values()]
      .filter((module) => !!module.controllers)
      .flatMap((module) => [...module.controllers.values()]);
  }

  private getControllerMethods(instance: any) {
    const prototype = Object.getPrototypeOf(instance);
    return Object.getOwnPropertyNames(prototype)
      .filter((methodName) => Reflect.hasMetadata('path', instance[methodName]))
      .map((methodName) => ({
        methodName,
        path: Reflect.getMetadata('path', instance[methodName]),
        httpVerb: Reflect.getMetadata('method', instance[methodName]),
      }));
  }

  private getHttpMethod(httpVerb: number): string {
    switch (httpVerb) {
      case 0:
        return 'GET';
      case 1:
        return 'POST';
      case 2:
        return 'PUT';
      case 3:
        return 'DELETE';
      case 4:
        return 'PATCH';
      case 5:
        return 'OPTIONS';
      default:
        return 'UNKNOWN';
    }
  }
}