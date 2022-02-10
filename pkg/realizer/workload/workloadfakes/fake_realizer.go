// Code generated by counterfeiter. DO NOT EDIT.
package workloadfakes

import (
	"context"
	"sync"

	"github.com/vmware-tanzu/cartographer/pkg/apis/v1alpha1"
	"github.com/vmware-tanzu/cartographer/pkg/realizer/workload"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
)

type FakeRealizer struct {
	RealizeStub        func(context.Context, workload.ResourceRealizer, *v1alpha1.ClusterSupplyChain) ([]*unstructured.Unstructured, error)
	realizeMutex       sync.RWMutex
	realizeArgsForCall []struct {
		arg1 context.Context
		arg2 workload.ResourceRealizer
		arg3 *v1alpha1.ClusterSupplyChain
	}
	realizeReturns struct {
		result1 []*unstructured.Unstructured
		result2 error
	}
	realizeReturnsOnCall map[int]struct {
		result1 []*unstructured.Unstructured
		result2 error
	}
	invocations      map[string][][]interface{}
	invocationsMutex sync.RWMutex
}

func (fake *FakeRealizer) Realize(arg1 context.Context, arg2 workload.ResourceRealizer, arg3 *v1alpha1.ClusterSupplyChain) ([]*unstructured.Unstructured, error) {
	fake.realizeMutex.Lock()
	ret, specificReturn := fake.realizeReturnsOnCall[len(fake.realizeArgsForCall)]
	fake.realizeArgsForCall = append(fake.realizeArgsForCall, struct {
		arg1 context.Context
		arg2 workload.ResourceRealizer
		arg3 *v1alpha1.ClusterSupplyChain
	}{arg1, arg2, arg3})
	stub := fake.RealizeStub
	fakeReturns := fake.realizeReturns
	fake.recordInvocation("Realize", []interface{}{arg1, arg2, arg3})
	fake.realizeMutex.Unlock()
	if stub != nil {
		return stub(arg1, arg2, arg3)
	}
	if specificReturn {
		return ret.result1, ret.result2
	}
	return fakeReturns.result1, fakeReturns.result2
}

func (fake *FakeRealizer) RealizeCallCount() int {
	fake.realizeMutex.RLock()
	defer fake.realizeMutex.RUnlock()
	return len(fake.realizeArgsForCall)
}

func (fake *FakeRealizer) RealizeCalls(stub func(context.Context, workload.ResourceRealizer, *v1alpha1.ClusterSupplyChain) ([]*unstructured.Unstructured, error)) {
	fake.realizeMutex.Lock()
	defer fake.realizeMutex.Unlock()
	fake.RealizeStub = stub
}

func (fake *FakeRealizer) RealizeArgsForCall(i int) (context.Context, workload.ResourceRealizer, *v1alpha1.ClusterSupplyChain) {
	fake.realizeMutex.RLock()
	defer fake.realizeMutex.RUnlock()
	argsForCall := fake.realizeArgsForCall[i]
	return argsForCall.arg1, argsForCall.arg2, argsForCall.arg3
}

func (fake *FakeRealizer) RealizeReturns(result1 []*unstructured.Unstructured, result2 error) {
	fake.realizeMutex.Lock()
	defer fake.realizeMutex.Unlock()
	fake.RealizeStub = nil
	fake.realizeReturns = struct {
		result1 []*unstructured.Unstructured
		result2 error
	}{result1, result2}
}

func (fake *FakeRealizer) RealizeReturnsOnCall(i int, result1 []*unstructured.Unstructured, result2 error) {
	fake.realizeMutex.Lock()
	defer fake.realizeMutex.Unlock()
	fake.RealizeStub = nil
	if fake.realizeReturnsOnCall == nil {
		fake.realizeReturnsOnCall = make(map[int]struct {
			result1 []*unstructured.Unstructured
			result2 error
		})
	}
	fake.realizeReturnsOnCall[i] = struct {
		result1 []*unstructured.Unstructured
		result2 error
	}{result1, result2}
}

func (fake *FakeRealizer) Invocations() map[string][][]interface{} {
	fake.invocationsMutex.RLock()
	defer fake.invocationsMutex.RUnlock()
	fake.realizeMutex.RLock()
	defer fake.realizeMutex.RUnlock()
	copiedInvocations := map[string][][]interface{}{}
	for key, value := range fake.invocations {
		copiedInvocations[key] = value
	}
	return copiedInvocations
}

func (fake *FakeRealizer) recordInvocation(key string, args []interface{}) {
	fake.invocationsMutex.Lock()
	defer fake.invocationsMutex.Unlock()
	if fake.invocations == nil {
		fake.invocations = map[string][][]interface{}{}
	}
	if fake.invocations[key] == nil {
		fake.invocations[key] = [][]interface{}{}
	}
	fake.invocations[key] = append(fake.invocations[key], args)
}

var _ workload.Realizer = new(FakeRealizer)